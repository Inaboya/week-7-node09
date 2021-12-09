"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
const passport = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        return done(null, jwt_payload);
    }));
};
exports.passport = passport;
//# sourceMappingURL=passport.js.map