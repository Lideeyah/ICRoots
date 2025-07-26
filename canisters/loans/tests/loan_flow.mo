import Unit "mo:base/Unit";
import Principal "mo:base/Principal";
import Loans "canisters/loans/src/main";

actor {
  public func run() : async Bool {
    let loans = await Loans.Loans();         // instantiate in test env
    let dummyPrincipal = Principal.fromText("aaaaa-aa");
    let id = await loans.requestLoan(15_000_000, 200_000_000, 750, 30 * 24 * 3600);
    await loans.fundLoan(id);
    await loans.markRepaid(id);
    let l = await loans.getLoan(id);
    assert (switch l { case (?lo) lo.status == #Repaid; case null false });
    return true;
  }
};
