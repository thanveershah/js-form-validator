const validate =  (formSelector, config = {}, messages = {} ) => {
    document.querySelectorAll(formSelector).forEach(form=>{
        form.addEventListener("submit", function(e){
           
            let error = false; 
            for( _name in config ){
                
                let inputElem = this.querySelector(`[name="${_name}"]`);
                
                if( inputElem ){
                    let _config = config[_name];
                    const val = inputElem.value;
                    for( rule in _config ){
                        
                        switch( rule ){
                            case "required":
                                if(  _config[rule] && val.trim() == "" ){
                                    console.log( rule , _name,inputElem.value, "OK")
                                    error = true;
                                    let messageTxt = `The ${_name} is required`;
                                    validateMessage({
                                        _name,
                                        rule,
                                        messageTxt,
                                        messages,
                                        inputElem
                                    });
                                }
                                break;
                            case "is_email":
                                
                                if( _config[rule] && val.trim() != "" && !val.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ){
                                    error = true;
                                    let messageTxt = `The ${_name} is not a valid Email`;
                                    validateMessage({
                                        _name,
                                        rule,
                                        messageTxt,
                                        messages,
                                        inputElem
                                    });
                                }
                                break;
                            case "uae_number":
                                if( _config[rule] ){

                                }
                        }
                    }
                }else{
                    console.error("Element not found:" + _name)
                }
                
            }
            if(error){
                e.preventDefault();
            }
        })
    })
}