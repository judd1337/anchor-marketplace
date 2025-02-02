use anchor_lang::error_code;

#[error_code]
pub enum MarketplaceError{
    #[msg("Name too long")]
    NameTooLong,
    #[msg("Please check for underflow and overflow")]
    ArithmeticOverflow,
    #[msg("Fee 0 to 10000 (0-100%)")]
    InvalidFee,
    #[msg("Invalid NFT collection")]
    InvalidCollection,
}