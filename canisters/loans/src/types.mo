import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat "mo:base/Nat";

module {
  public type LoanStatus = { #Requested; #CollateralReady; #Funded; #Repaid; #Defaulted };

  public type Loan = {
    id          : Nat;
    borrower    : Principal;
    lender      : ?Principal;
    btcLocked   : Nat;        // sats
    amountUSDT  : Nat;        // minor units
    interestBps : Nat;        // basis points
    requestedAt : Time.Time;
    dueAt       : Time.Time;
    status      : LoanStatus;
  };
}
