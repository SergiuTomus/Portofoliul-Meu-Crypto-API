const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models").User;
const validateRegister = require("../validations/register");
const validateLogin = require("../validations/login");

// @route   POST /register
// @access  Public
exports.registerUser = (req, res, next) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user) {
        return res.status(422).json({ message: "Adresa de email exista deja" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          // 10 - nr of salting rounds
          if (err) {
            return res
              .status(500)
              .json({ message: "Parola nu este valida", error: err });
          } else {
            User.create({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              phone: req.body.phone,
              delivery_address: req.body.delivery_address,
            })
              .then((result) => {
                res.status(201).json({
                  message: "Contul a fost creat cu succes",
                });
              })
              .catch((err) => {
                console.log("error: ", err.errors[0].message);
                if (
                  err.errors[0].message == "Validation isEmail on email failed"
                ) {
                  return res.status(500).json({
                    message: "Formatul adresei de email este invalid",
                  });
                }
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// @route   POST /login
// @access  Public
exports.loginUser = (req, res, next) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Email sau parola incorecta",
        });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Autentificare nereusita",
          });
        }
        if (result) {
          // result == true || false
          const payload = { id: user.id, email: user.email };

          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: "1d" },
            (err, token) => {
              return res.status(200).json({
                message: "Autentificare cu succes",
                token: "Bearer " + token,
                user: {
                  name: user.name,
                  phone: user.phone,
                  delivery_address: user.delivery_address,
                },
              });
            }
          );
        } else {
          res.status(401).json({ message: "Email sau parola incorecta" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// @route   PATCH /user/:userId
// @access  Private
exports.updateUser = (req, res, next) => {
  User.update(
    { ...req.body },
    {
      where: { id: req.params.userId },
    }
  )
    .then((result) => {
      console.log(result);
      if (result[0] === 1) {
        res.status(200).json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ message: "User record not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// @route   GET admin/user
// @detail  Return restaurant user
// @access  Private
exports.getUser = (req, res, next) => {
  res.status(200).json({ message: "User test data message" }); // to  delete

  // Restaurant_User.findByPk(
  //   req.user.id,     // from passport middleware
  //   {
  //     attributes: ['status', 'phone', 'restaurant_id']
  //   }
  // )
  //   .then(user => {
  //     Restaurant.findByPk(
  //       user.restaurant_id,
  //       {
  //         attributes: { exclude: ['createdAt', 'updatedAt'] }
  //       }
  //     )
  //       .then((restaurant) => {
  //         res.status(200).json({
  //           user: { user_status: user.status, user_phone: user.phone },
  //           restaurant: restaurant
  //         });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         res.status(500).json({ error: err });
  //       });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({ error: err });
  //   });
};
