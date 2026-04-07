function pickEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
  }
  return undefined;
}

export const env = {
  client: {
    appUrl: pickEnv("NEXT_PUBLIC_APP_URL"),
    builderCode: pickEnv("NEXT_PUBLIC_BUILDER_CODE"),
    ipfsGateway: pickEnv("NEXT_PUBLIC_IPFS_GATEWAY"),
    developerFid: pickEnv("NEXT_PUBLIC_DEVELOPER_FID"),
    supabaseUrl: pickEnv(
      "NEXT_PUBLIC_SUPABASE_SUPABASE_URL",
      "NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_URL"
    ),
    supabaseAnonKey: pickEnv(
      "NEXT_PUBLIC_SUPABASE_SUPABASE_ANON_KEY"
    ),
    supabasePublishableKey: pickEnv(
      "NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY",
      "NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY"
    ),
  },
  server: {
    openaiApiKey: pickEnv("OPENAI_API_KEY"),
    neynarApiKey: pickEnv("NEYNAR_API_KEY"),
    pinataJwt: pickEnv("PINATA_JWT"),
    signerPrivateKey: pickEnv("SIGNER_PRIVATE_KEY"),
    custodyPrivateKey: pickEnv("CUSTODY_PRIVATE_KEY"),
    baseRpcUrl: pickEnv("BASE_RPC_URL"),
    baseSepoliaRpcUrl: pickEnv("BASE_SEPOLIA_RPC_URL"),
  },
};
