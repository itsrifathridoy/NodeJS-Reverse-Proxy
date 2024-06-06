const { query } = require("../Service/db")

module.exports = {
    CreateMapping: async(req, res) => {
        try {
            const { domain, host, port } = req.body;
            const sql = `INSERT INTO domain_mapping (domain, host, port) VALUES (?,?,?)`;
            await query(sql, [domain, host, port]);
        } catch (error) {
            console.log(error);
            return res.send({
                message: error.message
            })
        }
    },
    GetMapping: async(req, res) => {
        try {
            const sql = `SELECT * FROM domain_mapping`;
            const result = await query(sql);
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.send({
                message: error.message
            })
        }
    },
    getMappingByDomain: async(req, res) => {
        try {
            const domain = req.params.domain;
            const sql = `SELECT * FROM domain_mapping WHERE domain = ?`;
            const result = await query(sql, [domain]);
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.send({
                message: error.message
            })
        }
    },
    deleteMapping: async(req, res) => {
        try {
            const domain = req.params.domain;
            const sql = `DELETE FROM domain_mapping WHERE domain = ?`;
            await query(sql, [domain]);
            return res.send({
                message: 'Mapping Deleted'
            })
        } catch (error) {
            console.log(error);
            return res.send({
                message: error.message
            })
        }
    }
}