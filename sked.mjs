/*
    Sked is a minimalistic timeline tool. It expects as argument an object where the key represents the time, in miliseconds, a callback will be run, and as the value the callback itself.
    It return a function that, when run, will create a setInterval() that will run all callbacks on schedule and then clean itself up.
*/
function sked( schedule ){

    // Gets the Greatest Common Divisor between all calls, so we can set the most inexpensive interval possible.
    function gcd ( arr ){
        const euclideanAlgorithm = (a,b) => !b ? a : euclideanAlgorithm( b, a%b )
        return arr.reduce( (acc,cur,idx) => !idx ? cur : euclideanAlgorithm( acc, cur ), 1)
    }

    // Lists all times (in milliseconds) when a callback has been scheduled.
    const callDelays = Object.keys( schedule ).map( n => +n ).sort( (a,b) => a-b )


    // Figures out the most efficient interval
    const interval = gcd( callDelays )

    // Figures out when is the last call, so the setInterval can be cleared.
    const maxDelay = Math.max( ...callDelays )

    // Returns a function that, when executed, will start the timeline
    return function(){
        let currentDelay = 0
        let loop = setInterval( function(){
            currentDelay += interval
            // If there's a callback for the current delay, run it
            if( schedule[ String(currentDelay)] )
                schedule[ String(currentDelay)]()
            // If we've reached the last delay with a callback, clear interval
            if( currentDelay >= maxDelay )
                clearInterval( loop )
        }, interval )
    }
}

export default sked