raptorBuilder.addLoader(function(raptor) {
    raptor.defineClass('resources.SearchPathEntry', function(raptor) {
    
        return {
            /**
             * 
             * @returns
             */
            findResourceSync: function(path) {
                throw new Error('Not Implemented');
            }
        };
    });
});