const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername) {

    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUsername(username);
        console.log(user);
        if (user == null) {
            return done(null, false, { message: 'User not found'});
        }

        if (user.isAdmin == null || user.isAdmin == false) {
            return done(null, false, { message: 'Not authorized!'});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Login failed'});
            }
            
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'username'},
    authenticateUser));
    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });
}

module.exports = initialize