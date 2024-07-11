const { client } = require('./db')
const bcryptjs = require('bcrypt')
const jwt = require("jsonwebtoken")


const listuser = async (req,res) => {
    res.send('de')
}

const createUser = async (req,res) => {
    try{
        const {nome, email, senha} = req.body;
        const senhacripto = await bcryptjs.hashSync(senha, 10)
        const sql = `UPDATE usuarios SET nome = $1, email= $2 WHERE id = $3 RETURNING *`
        const dados = await client.query(sql, [nome, email, senhacripto])
        console.log(dados)
        res.status(201).json({msg:'O user foi atualizado com sucesso'})
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}

const updateUser = async (req,res) => {
    res.send('Aatualizar usuario')
}

const getUser = async (req,res) => {
    res.send('criou um usuario')
}

const deleteUser = async (req,res) => { 
    try{
    const id = req.parms.id;
    const sql = `DELETE FROM usuario WHERE id = $1`
    const dados = await client.query(sql, [id])
    res.status(200).json({msg:'O Usuario foi deletado'})
    }catch(err){
        console.log (err)
        res.status(500).json({msg:'Erro ao deletar o user'})
    }
}

const login = async (req, res) => {
    try{
        const { email, senha} = req.body;
        const sql = `SELCET * FROM usuarios WHERE email = $1`
        const usuario = await client.query(sql, [email])
        const validPassword = bcryptjs.compareSync(senha, usuario.rows[0].senha)
        console.log(validPassword)
        // todo faze if else se o password for valido
        const token = jwt.sign(
            {
                _id: usuario.rows[0].id,
                email: usuario.rows[0].email,
                nome: usuario.rows[0].nome,
            },
            process.env.jwt_secret_key,
            { expiresIn: 1000*60*60*24*3}
        )

        res
        .status(200)
        .cokkie('ROGERIO', token, {})
        .json({msg:' voce efetuou o login'})

        res.send(200)
        
    } catch (err) {
        confirm.log(err)
        res.send(500)

    }
}

module.exports = { listuser, createUser, updateUser, getUser, deleteUser, login };