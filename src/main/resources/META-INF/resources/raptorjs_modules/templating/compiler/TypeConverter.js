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

raptor.defineClass(
    'templating.compiler.TypeConverter',
    function(raptor) {
        "use strict";
        
        var ExpressionParser = raptor.require('templating.compiler.ExpressionParser'),
            stringify = raptor.require('json.stringify').stringify,
            Expression = raptor.require('templating.compiler.Expression');
        
        var TypeConverter = function() {
            
        };
        
        TypeConverter.convert = function(value, targetType, allowExpressions) {
            
            
            var hasExpression = false,
                expressionParts = [];
            
            if (targetType === 'custom' || targetType === 'identifier') {
                return value;
            }
            
            if (targetType === 'expression') {
                return new Expression(value);
            }
            
            if (allowExpressions) {
                ExpressionParser.parse(value, {
                    text: function(text) {
                        expressionParts.push(stringify(text));
                    },
                    
                    expression: function(expression) {
                        expressionParts.push(expression);
                        hasExpression = true;
                    }
                });
                
                if (hasExpression) {
                    return new Expression(expressionParts.join("+"));
                }
            }
            
            if (targetType === 'string') {
                return allowExpressions ? new Expression(value ? stringify(value) : "null") : value;
            }
            else if (targetType === 'boolean') {
                value = value.toLowerCase();
                value = value === 'true' || value === 'yes'; //convert it to a boolean
                return allowExpressions ? new Expression(value) : value;
            }
            else if (targetType === 'float' || targetType === 'double' || targetType === 'number' || targetType === 'integer') {
                if (targetType === 'integer') {
                    value = parseInt(value, 10);
                }
                else {
                    value = parseFloat(value);
                }
                return allowExpressions ? new Expression(value) : value;
            }
            else {
                raptor.throwError(new Error("Unsupported attribute targetType: " + targetType));
            }
        };
        
        return TypeConverter;
    });