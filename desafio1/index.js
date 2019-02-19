const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoscape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

let age = ''

const logMiddleware = (req, res, next) => {
  if (req.body.age == '' || req.body.age == null || req.body.age == undefined) {
    console.log('Usuário não informou a idade ou ocorreu alguma zica')
    return res.redirect('/')
  } else {
    return next()
  }
}

app.get('/', (req, res) => {
  return res.render('home')
})

app.get('/major', (req, res) => {
  return res.render('major', { age })
})

app.get('/minor', (req, res) => {
  return res.render('minor', { age })
})

app.post('/check', logMiddleware, (req, res) => {
  age = req.body.age
  if (req.body.age >= 18) {
    return res.redirect('/major')
  } else {
    return res.redirect('/minor')
  }
})

app.listen(3000)
