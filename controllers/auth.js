const User = require("../models/User")
const { hashSync, genSaltSync } = require("bcrypt")
const passport = require("../config/passport")


///////////////// Signup /////////////////
exports.signupProcess = async (req, res) => {
  const { email, password } = req.body
  if ( email === "" || password === "")
      return res.status(401).json({message: "Por favor, llena todos los campos"})
  const existingUser = await User.findOne({ email })
  if (existingUser)
      return res.status(401).json({message: "El email ya está registrado, por favor intenta con otro"})
  const hashPswd = hashSync(password, genSaltSync(12))
  await User.create({
  email,
  password: hashPswd
  })
  res.status(200).json({message: "Se creó correctamente el usuario"})
}

///////////////// Login /////////////////
exports.loginProcess = (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
      if (err){
          console.log(failureDetails)
          res.status(500).json({message: "Email o contraseña incorrectos"})
          return
      }

      if (!user){
          res.status(401).json({message: "Email o contraseña incorrectos"})
          return
      }
      
      req.login(user, err => {
          if (err) {
              res.status(500).json({message: "No se pudo guardar la sesión"})
              return
          }
          res.status(200).json(user)
      })
  })(req, res, next)  
}

///////////////// Current user /////////////////
exports.currentUser = async (req, res) => {
  const user = await User.findById(req.user.id)
  res.status(200).json({ user })
}

///////////////// Logout /////////////////
exports.logout = (req, res) => {
  req.logout()
  res.status(200).json({message: "Sesión finalizada exitosamente"})
}