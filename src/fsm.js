class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) 
    {
        this.current_state=config.initial;
        this.arrstate=config.states;
        this.history_transition=[];
        this.history_transition.push('normal');
        this.time=(-1);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() 
    {
        return this.current_state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) 
    {
        var tmp=this.getState();
        if(this.arrstate[state]!==undefined)
        {
           // for(var i in this.arrstate[tmp].transitions)
           // {
           //     if(state===this.arrstate[tmp].transitions[i])
           //     {
                    this.current_state=state;
                    this.history_transition.push(state);
                    this.time=this.history_transition.length-1;
           //         break;
            //    }
           // }
        }
        else
        {
            throw new Error(state);
       }
       
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) 
    {
        var tmp=this.arrstate[this.current_state].transitions[event]
        if(tmp!==undefined)
        {
            this.current_state=tmp;
            if(tmp!==this.history_transition[this.history_transition.length-1])
                this.history_transition.push(tmp);
            this.time=this.history_transition.length-1;
        }
        if(tmp===undefined)
        {
            throw new Error(event);
        }
    }

    /**
     * Resets FSM state to initial.
     */
    //&&&&&&&&& удалять ли историю ?
    reset()
    {
        this.current_state='normal';
        this.clearHistory();
       // this.history_transition.push('normal');
       // this.time=this.history_transition.length-1;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) 
    {
      var tmp=['normal','busy','hungry','sleeping'];
      var res=[];
      for(var i=0;i<tmp.length;i++)
      {
          if(this.arrstate[tmp[i]].transitions[event]!==undefined)
          {
             res.push(tmp[i]);
          }
      }
      if(res.length===0)
      {
        if(event===undefined)
        {
            return tmp; 
        }
        else
        {
            if((event!=='normal')||(event!=='busy')||(event!=='hungry')||(event!=='sleeping'))
                return res;
        }
      }
      else
      {
          return res;
      }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo()
    {
        if(this.time-1<0)
            return false;
        else
        {
            this.time=this.time-1;
            this.current_state=this.history_transition[this.time];
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() 
    {
        if(((this.time+1)<=(this.history_transition.length-1))&&((this.time!==(-1))))
        {
            this.time=this.time+1;
            this.current_state=this.history_transition[this.time];
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory()
    {
        this.history_transition=[];
        this.time=(-1);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
