import { Mongoose, Model } from "mongoose";
import type { Adapter, AdapterUser, AdapterSession, VerificationToken as AdapterVerificationToken } from "next-auth/adapters";
import type { Account as AdapterAccount } from "next-auth";
interface MongooseAdapterModels {
    user?: Model<AdapterUser>;
    session?: Model<AdapterSession>;
    account?: Model<AdapterAccount>;
    verificationToken?: Model<AdapterVerificationToken>;
}
declare const MongooseAdapter: (dbConnect: Promise<Mongoose>, models?: MongooseAdapterModels) => Adapter;
export default MongooseAdapter;
