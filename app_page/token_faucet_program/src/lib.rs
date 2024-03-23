use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    program_error::ProgramError,
};
use spl_token::instruction::transfer;

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    let sender_account = next_account_info(accounts_iter)?;
    let sender_token_account = next_account_info(accounts_iter)?;
    let recipient_token_account = next_account_info(accounts_iter)?;
    let token_program = next_account_info(accounts_iter)?;

    if !token_program.key.eq(&spl_token::id()) {
        return Err(ProgramError::IncorrectProgramId);
    }

    let amount = 50000000;

    let transfer_instruction = transfer(
        token_program.key,
        sender_token_account.key,
        recipient_token_account.key,
        sender_account.key,
        &[&sender_account.key],
        amount,
    )?;

    solana_program::program::invoke(
        &transfer_instruction,
        &[
            sender_account.clone(),
            sender_token_account.clone(),
            recipient_token_account.clone(),
            token_program.clone(),
        ],
    )?;

    Ok(())
}
