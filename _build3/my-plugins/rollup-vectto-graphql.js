module.exports = function (jetpack, slash) {
    const isGraphQL = (id) => id.split('.').pop().toLowerCase() === 'gql';
    return {
        name: 'rollup-vectto-graphql',
        transform (code, id) { 
            id = slash(id);             
            if (! isGraphQL(id)) { return; }     
            return {
                code: `export default ${ JSON.stringify(code) }`,
                map: { mappings: '' }
            }; 
        }
    };
};