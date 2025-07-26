use ic_cdk::update;
use std::cell::Cell;

thread_local! {
    static COUNT: Cell<u64> = Cell::new(0);
}

#[update]
fn get_count() -> u64 {
    COUNT.with(|c| c.get())
}

#[update]
fn inc_count() -> u64 {
    COUNT.with(|c| {
        let next = c.get() + 1;
        c.set(next);
        next
    })
}
