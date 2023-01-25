"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MongooseAdapter = (dbConnect, models) => {
    // Load Backup Models
    if (!mongoose_1.default.models.User) {
        console.log("no USER model");
        require("./models/User");
    }
    if (!mongoose_1.default.models.Session) {
        console.log("no SESSION model");
        require("./models/Session");
    }
    if (!mongoose_1.default.models.VerificationToken) {
        console.log("no VerificationToken model");
        require("./models/VerificationToken");
    }
    if (!mongoose_1.default.models.Account) {
        console.log("no ACCOUNT model");
        require("./models/Account");
    }
    // Models
    const User = mongoose_1.default.models.User;
    const Session = mongoose_1.default.models.Session;
    const VerificationToken = mongoose_1.default.models.VerificationToken;
    const Account = mongoose_1.default.models.Account;
    // Methods
    const adaptorMethods = {
        // These methods are required for all sign in flows:
        createUser(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("createUser: ", data);
                yield dbConnect;
                const user = yield User.create(data);
                return user;
            });
        },
        getUser(id) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("getUser: ", id);
                yield dbConnect;
                const user = yield User.findById(id);
                console.log("getUser user: ", user);
                return user;
            });
        },
        getUserByEmail(email) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("getUserByEmail: ", email);
                yield dbConnect;
                const user = yield User.findOne({ email });
                return user;
            });
        },
        getUserByAccount(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("getUserByAccount: ", data);
                const { providerAccountId, provider } = data;
                yield dbConnect;
                // Get Account
                const account = yield Account.findOne({ providerAccountId, provider });
                if (!account)
                    return null;
                // Find User
                const user = yield adaptorMethods.getUser(account.userId);
                return user;
            });
        },
        updateUser(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("updateUser: ", data);
                const { id } = data, restData = __rest(data, ["id"]);
                yield dbConnect;
                const user = yield User.findByIdAndUpdate(id, restData, {
                    new: true,
                    runValidators: true,
                    returnDocument: "after",
                });
                return user;
            });
        },
        deleteUser(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("deleteUser: ", userId);
                yield dbConnect;
                const user = yield User.findByIdAndDelete(userId);
                return user;
            });
        },
        linkAccount(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("linkAccount: ", data);
                yield dbConnect;
                const account = yield Account.create(data);
                return account;
            });
        },
        unlinkAccount(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("unlinkAccount: ", data);
                const { providerAccountId, provider } = data;
                yield dbConnect;
                const account = yield Account.findOneAndDelete({
                    providerAccountId,
                    provider,
                });
                if (account)
                    return account;
            });
        },
        createSession(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("createSession: ", data);
                yield dbConnect;
                const session = yield Session.create(data);
                return session;
            });
        },
        getSessionAndUser(sessionToken) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("getSessionAndUser: ", sessionToken);
                yield dbConnect;
                // Get Session
                const session = yield Session.findOne({ sessionToken });
                if (!session)
                    return null;
                // Find User
                const user = yield adaptorMethods.getUser(session.userId);
                if (!user)
                    return null;
                return { user, session };
            });
        },
        updateSession(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("updateSession: ", data);
                const { id } = data, restData = __rest(data, ["id"]);
                yield dbConnect;
                const session = yield Session.findByIdAndUpdate(id, restData, {
                    new: true,
                    runValidators: true,
                });
                return session;
            });
        },
        deleteSession(sessionToken) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("deleteSession: ", sessionToken);
                yield dbConnect;
                const session = yield Session.findOneAndDelete({ sessionToken });
                return session;
            });
        },
        // These methods are required to support email / passwordless sign in:
        createVerificationToken(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("createVerificationToken: ", data);
                yield dbConnect;
                const verificationToken = yield VerificationToken.create(data);
                return verificationToken;
            });
        },
        useVerificationToken(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("useVerificationToken: ", data);
                const { identifier, token } = data;
                yield dbConnect;
                const verificationToken = yield VerificationToken.findOne({
                    identifier,
                    token,
                });
                return verificationToken;
            });
        },
        // ################################################################################
        // These methods will be required in a future release, but are not yet invoked:
        // async deleteUser() {
        //   return;
        // },
        // async unlinkAccount() {
        //   return;
        // },
    };
    return adaptorMethods;
};
exports.default = MongooseAdapter;
