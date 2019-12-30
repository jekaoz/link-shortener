const {Router} = require('express');
const config = require('config');

const Link = require('../models/Link');

const router = Router();

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code});

        if (!link) {
            return res.status(404).json({message: 'Ссылка не найдена'});
        }

        link.clicks += 1;

        await link.save();

        return res.redirect(link.from);
    } catch (e) {
        console.error('REDIRECT_FAILED', e);
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

module.exports = router;
