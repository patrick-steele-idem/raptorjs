/*
 * Copyright 2011 eBay Software Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * 
 * @extension Raptor Stringify
 * 
 */
define.extend('raptor/json', function(require, target) {
        'use strict';
        
        var stringify = require("raptor/json/stringify").stringify;
        
        //NOTE: Target is the "json" module that we are extending with this mixin
        target.registerImpl('raptor', 'stringify', stringify);
        
        return {
            /**
             * @funtion
             * @param o {Object} The object to stringify
             * @returns {String} The JSON string representation of the provided object
             */
            raptorStringify: stringify
        };
    });