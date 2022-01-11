const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Comment } = require("../models");
const { getTokenUserId, areIdentique, removeDataFromDB, getRoleUser} = require("../utils/fonctions");



// affiche tout les commentaires d'un média
exports.commentDisplayAll = async (req, res) => {
    try {
        const allComment = await Comment.findAll({
            where : {
                mediumId: req.params.id,
            }
        });
        (allComment != null)? res.status(200).json(allComment) : console.log("sorry no comments");
        
    } catch (error) {
        res.status(500).json({ error });
    }
};

// ajout d'un commentaire
// exports.commentAdd = async (req, res) => {
//     const { title, message } = req.body;
//     const id = getTokenUserId(req);
//     try {
//         const comment = await Comment.create({
//             MediumId: req.params.id,
//             UserId: id,
//             title,
//             message,
//         });
//         res.status(200).send({ message: "commentaire publié", comment });
//     } catch (error) {
//         res.status(500).json({ message: "un problème est survenu", error });
//     }
// };

exports.commentAdd = async (req, res) => {
    const { message } = req.body;
    const id = getTokenUserId(req);
    try {
        const comment = await Comment.create({
            MediumId: req.params.id,
            UserId: id,
            message,
        });
        res.status(200).send({ message: "commentaire publié", comment });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: "un problème est survenu", error });
    }
};

// efface un commentaire
exports.commentRemove = async (req, res) => {
    try {
        // user doit avoir créer le commentaire pour pouvoir le supprimer
        if(await areIdentique(req, Comment)) {
            await removeDataFromDB(req, Comment);
            res.status(200).json({ message: "votre commentaire a été supprimé" });
        }
        else {
            // check if user session has an admin or moderator role and can delete media
            const sessionRoleUser = await getRoleUser(getTokenUserId(req), User);
            if (
                sessionRoleUser === "admin" ||
                sessionRoleUser === "moderator"
            ) {
                await removeDataFromDB(req, Comment);
                res.status(200).json({
                    message: "le média a été supprimé",
                });
            } else {
                res.status(200).json({
                    message:
                        "vous ne pouvez pas supprimer le média créé par un autre utilisateur",
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "un problème est survenu" });
    }
};
