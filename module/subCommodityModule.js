const mongoose = require('mongoose')

const subcommoditySchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        maxlength: 1,
        minlength: 1,
        match: /^[A-Z]$/ // Ensures that the code is a single uppercase letter
    },
    CrossEntry: [{
            index : Number,
            Definition: String,
            revisionNumber: Number,
            revisedBy: String
        }]
    
})

const subcommodityCollection = mongoose.model('subcommmodity',subcommoditySchema)

module.exports = {
    subcommodityCollection,
    createEmpty : (field) => {
        const subcommmodity = new subcommodityCollection(field)
        return subcommmodity.save()
    },

    searchIndex: (index) => subcommodityCollection.findOne({CrossEntry: {$element: { index : index}}}),

}
