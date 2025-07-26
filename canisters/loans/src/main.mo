import Array "mo:base/Array";
import Iter  "mo:base/Iter";
import Time  "mo:base/Time";
import Principal "mo:base/Principal";

import Types "./types";

actor class Loans() = this {

  stable var nextId  : Nat                    = 0;
  stable var loans   : [Types.Loan]           = [ ];
  stable var indexByBorrower : [(Principal, [Nat])] = [ ];   // borrower → loanIds

  //--------------------------------------------------
  // -------- PUBLIC API (update calls) --------------
  //--------------------------------------------------

  public shared({caller}) func requestLoan(btc : Nat, usdt : Nat, interestBps : Nat, durationSecs : Nat) : async Nat {
    let id = nextId;
    nextId += 1;

    let loan : Types.Loan = {
      id           = id;
      borrower     = caller;
      lender       = null;
      btcLocked    = btc;
      amountUSDT   = usdt;
      interestBps  = interestBps;
      requestedAt  = Time.now();
      dueAt        = Time.now() + (durationSecs * 1_000_000_000);   // ns
      status       = #Requested;
    };

    loans := Array.append(loans, [loan]);
    _indexInsert(caller, id);

    return id;
  };

  public shared({caller}) func fundLoan(id : Nat) : async () {
    switch (_loanMut(id)) {
      case (?lo) {
        assert lo.status == #Requested;
        lo.lender := ?caller;
        lo.status := #Funded;
      };
      case null { assert false; };
    };
  };

  public shared({caller}) func markRepaid(id : Nat) : async () {
    switch (_loanMut(id)) {
      case (?lo) { assert lo.borrower == caller; lo.status := #Repaid };
      case null  { assert false };
    };
  };

  //--------------------------------------------------
  // -------------- QUERY HELPERS --------------------
  //--------------------------------------------------

  public query func getLoan(id : Nat) : async ?Types.Loan {
    _loan(id);
  };

  public query func listBorrowerLoans(p : Principal) : async [Types.Loan] {
    switch (indexByBorrower.find(p)) {
      case (?ids) { ids.map<Types.Loan>(func (i) { loans[i] }) };
      case null   { [ ] };
    }
  };

  //--------------------------------------------------
  // -------------- INTERNAL UTILS -------------------
  //--------------------------------------------------

  private func _loan(id : Nat) : ?Types.Loan {
    if (id < loans.size()) ?loans[id] else null;
  };

  private func _loanMut(id : Nat) : ?Types.Loan {
    if (id < loans.size()) ?loans[id] else null;
  };

  private func _indexInsert(p : Principal, id : Nat) {
    let idx = indexByBorrower.find(p);
    switch (idx) {
      case (?entry) {
        entry.1 := Array.append(entry.1, [id]);
      };
      case null {
        indexByBorrower := Array.append(indexByBorrower, [(p, [id])]);
      };
    };
  };

  //--------------------------------------------------
  // -------------- UPGRADE HOOKS --------------------
  //--------------------------------------------------

  system stable let Version : Nat = 1;

  system func preupgrade() {
    // Already using stable vars; nothing else needed
  };

  system func postupgrade() {
    assert Version == 1;
  };
};
