use anchor_lang::prelude::*;

pub mod contexts;
pub mod state;
pub mod errors;

use crate::contexts::*;
use crate::errors::*;

declare_id!("BB4sKLRCisKS6GnfvVRd1Qhfv2JDt9HCTUyAPLn5bicT");

#[program]
pub mod marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}
