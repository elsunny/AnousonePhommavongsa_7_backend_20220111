const jwt = require("jsonwebtoken");

// récupère l'id de l'utilisateur dans le token
exports.getTokenUserId = (req) => {
    const token = req.cookies.userJwt;
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload.id;
};

// récupère la date de création de l'entrée dans la bdd
exports.getEntryDate = async (id, Table) => {
    const date = await Table.findByPk(id);
    return date.createdAt;
};

// vérifie le role de l'utilisateur
exports.getRoleUser = async (tokenId, dbUser) => {
    try {
        const roleUser = await dbUser.findOne({
            where: {
                id: tokenId,
            },
        });
        return roleUser.role;
    } catch (error) {
        console.log(error);
    }
};

// trouve le pseudo de l'utilisateur
exports.getPseudoUser = async (userId, dbUser) => {
    try {
        const pseudoUser = await dbUser.findOne({
            where: {
                id: userId,
            },
        });
        return pseudoUser.pseudo;
    } catch (error) {
        console.log(error);
    }
};

// vérifie que 2 id sont identiques
exports.areIdentique = async (req, dbTable) => {
    try {
        const sessionUserId = getTokenUserId(req);
        const creatorUser = await dbTable.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (creatorUser.UserId === sessionUserId) {
            return true;
        } else return false;
    } catch (error) {
        console.log(error);
    }
};

// supprime une donnée dans une table
exports.removeDataFromDB = async (req, dbTable) => {
    try {
        await dbTable.destroy({
            where: {
                id: req.params.id,
            },
        });
    } catch (error) {
        console.log(error);
    }
}


// création d'un cookie d'identification
exports.setCookie = (findUser, res) => {
    const token = jwt.sign(
        {
            id: findUser.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
    );
    // mise en place d'un cookie pour la session d'un utilisateur
    res.cookie('userJwt', token, {maxAge: 1*24*60*60*1000, httpOnly: true}); // a ajouter lors de la mise en ligne sous https  httpOnly: true

}// supprime un cookie documentation
exports.removeCookie = (res) => {
    res.cookie('userJwt',"", {maxAge: 1*1000, httpOnly: true}); // a ajouter lors de la mise en ligne sous https  httpOnly: true

}
