/**
 * Get a user agent player rules 
 * @param {Object} ruleSet Object containing the rule set and actions
 * @return {String} What player should the browser lead with:
 * 		 'flash' ( default, lead with flash) | leadWithHTML5 | forceFlash | forceMsg Raw html message string to be displayed ( instead of player ) 
 */
window.getUserAgentPlayerRulesMsg = function( ruleSet ){
	return window.checkUserAgentPlayerRules( ruleSet, true );
};
window.checkUserAgentPlayerRules = function( ruleSet, getMsg ){
	var ua = ( mw.getConfig( 'KalturaSupport_ForceUserAgent' ) )? 
			mw.getConfig( 'KalturaSupport_ForceUserAgent' ) : navigator.userAgent;
	// Check for current user agent rules
	if( !ruleSet.rules ){
		// No rules, lead with flash
		return 'flash';
	}
	var getAction = function( inx ){
		if( ruleSet.actions && ruleSet.actions[ inx ] ){
			var action =  ruleSet.actions[ inx ];
			if( action.mode == 'leadWithHTML5' || action.mode == 'forceFlash' ){
				return action.mode;
			} else {
				if( getMsg ){
					return action.val;
				} else {
					return 'forceMsg';
				}
			}
		}
		// No defined action for this rule, lead with flash
		return 'flash';
	};
	for( var i in ruleSet.rules ){
		var rule = ruleSet.rules[i];
		if( rule.match ){
			if( ua.indexOf( rule.match ) !== -1 )
				return getAction( i );
		} else if( rule.regMatch  ){
			// Do a regex match
			if( ua.match( eval( rule.regMatch ) ) )
				return getAction( i );
		}
	}
	// No rules applied, lead with flash
	return 'flash';
};
