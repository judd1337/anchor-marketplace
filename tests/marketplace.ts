import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Marketplace } from "../target/types/marketplace";
import { Authorized, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { assert } from "chai";
import { BN } from "bn.js";
import { 
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID, 
  getAssociatedTokenAddressSync, 
  getMinimumBalanceForRentExemptMint, 
  createInitializeMint2Instruction,
  createAssociatedTokenAccountIdempotentInstruction,
  createMintToInstruction
} from "@solana/spl-token";
import { randomBytes } from "crypto";
import { log } from "console";

describe("marketplace", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Marketplace as Program<Marketplace>;
  const admin = anchor.web3.Keypair.generate(); // Keypair for the admin
  const maker = anchor.web3.Keypair.generate(); // Keypair for the maker
  const maker_mint = anchor.web3.Keypair.generate(); // Keypair for the maker mint
  const taker = anchor.web3.Keypair.generate(); // Keypair for the taker
  const collection_mint = anchor.web3.Keypair.generate(); // Keypair for the collection_mint

  
  const seed = new anchor.BN(randomBytes(8)); // Seed for the escrow account
  const tokenProgram = TOKEN_PROGRAM_ID;
  const marketplaceName = "test_marketplace";

  const [marketplace] = PublicKey.findProgramAddressSync(
    [Buffer.from("marketplace"), Buffer.from(marketplaceName)],
    program.programId
  );

  const [treasury] = PublicKey.findProgramAddressSync(
    [Buffer.from("treasury"), marketplace.toBuffer()],
    program.programId
  );

  const [rewards_mint] = PublicKey.findProgramAddressSync(
    [Buffer.from("rewards"), marketplace.toBuffer()],
    program.programId
  );

  const [listing] = PublicKey.findProgramAddressSync(
    [marketplace.toBuffer(), maker_mint.publicKey.toBuffer()],
    program.programId
  );

  const vault = getAssociatedTokenAddressSync(maker_mint.publicKey, listing, true, tokenProgram);
  const maker_ata = getAssociatedTokenAddressSync(maker_mint.publicKey, listing, true, tokenProgram);



  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
