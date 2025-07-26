use ic_cdk::stable::{stable_read, stable_write, stable_size};
use candid::{CandidType, Deserialize, Principal};
use std::cell::RefCell;
use std::time::{SystemTime, UNIX_EPOCH};



/* ---------- DATA TYPES ---------- */
#[derive(Clone, CandidType, Deserialize)]
pub enum LoanStatus {
    Requested,
    CollateralReady,
    Funded,
    Repaid,
    Defaulted,
}

#[derive(Clone, CandidType, Deserialize)]
pub struct Loan {
    pub id: u64,
    pub borrower: Principal,
    pub lender: Option<Principal>,
    pub btc_locked: u64,   // sats
    pub amount_usdt: u64,  // cents
    pub interest_bps: u32, // 100 bps = 1 %
    pub requested_at: u64, // sec since epoch
    pub due_at: u64,
    pub status: LoanStatus,
}

/* ---------- STABLE STORAGE ---------- */
thread_local! {
    static LOANS: RefCell<Vec<Loan>> = RefCell::new(Vec::new());
    static NEXT_ID: RefCell<u64> = RefCell::new(0);
}

/* ---------- HELPERS ---------- */
fn now_sec() -> u64 {
    SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs()
}

/* ---------- CANISTER METHODS ---------- */
#[ic_cdk::update]
fn request_loan(
    btc_sats: u64,
    usdt_cents: u64,
    interest_bps: u32,
    duration_secs: u64,
) -> u64 {
    assert!(btc_sats > 0 && usdt_cents > 0);
    let id = NEXT_ID.with(|n| {
        let mut n = n.borrow_mut();
        let curr = *n;
        *n += 1;
        curr
    });

    let loan = Loan {
        id,
        borrower: ic_cdk::api::caller(),
        lender: None,
        btc_locked: btc_sats,
        amount_usdt: usdt_cents,
        interest_bps,
        requested_at: now_sec(),
        due_at: now_sec() + duration_secs,
        status: LoanStatus::Requested,
    };
    LOANS.with(|l| l.borrow_mut().push(loan));
    id
}

#[ic_cdk::update]
fn fund_loan(id: u64) {
    LOANS.with(|l| {
        let mut loans = l.borrow_mut();
        let loan = loans.get_mut(id as usize).expect("loan not found");
        assert!(matches!(loan.status, LoanStatus::Requested));
        loan.lender = Some(ic_cdk::api::caller());
        loan.status = LoanStatus::Funded;
    });
}

#[ic_cdk::update]
fn mark_repaid(id: u64) {
    LOANS.with(|l| {
        let mut loans = l.borrow_mut();
        let loan = loans.get_mut(id as usize).expect("loan not found");
        assert_eq!(loan.borrower, ic_cdk::api::caller());
        loan.status = LoanStatus::Repaid;
    });
}

#[ic_cdk::query]
fn get_loan(id: u64) -> Option<Loan> {
    LOANS.with(|l| l.borrow().get(id as usize).cloned())
}

/* ---------- UPGRADE HOOKS ---------- */
#[ic_cdk::pre_upgrade]
fn pre_upgrade() {
    let vec = LOANS.with(|l| l.borrow().clone());
    let bytes = candid::encode_one(vec).unwrap();
    stable_write(0, &bytes);                 // offset must be first arg
}

#[ic_cdk::post_upgrade]
fn post_upgrade() {
    let total_bytes = stable_size();
    if total_bytes == 0 {
        return;
    }
    let mut buf = vec![0u8; total_bytes as usize];
    stable_read(0, &mut buf);
    let vec: Vec<Loan> = candid::decode_one(&buf).unwrap();
    LOANS.with(|l| *l.borrow_mut() = vec);
    NEXT_ID.with(|n| *n.borrow_mut() = LOANS.with(|l| l.borrow().len() as u64));
}

/* ---------- TEMP PING ---------- */
#[ic_cdk::query]
fn ping() -> &'static str {
    "loans alive"
}
