/**
 * Created by ArgiDux on 8/31/2015.
 */

var validator={
    init: function(){
        //
    },

    createResultObject: function(isValid,errorMessage){
        return {
            result: isValid,
            error: isValid? '': errorMessage
        }
    },

    // Length is not separated from symbol validity check for better security
    emailValidation: function(email){


        var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var result=pattern.test(email);

        var validationResult= this.createResultObject(result,'Invalid Email');
        return validationResult;

    },

    passwordValidation: function(password){
        var validationResult;

        var passwordPattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        var isValidPassword=passwordPattern.test(password);

        validationResult=this.createResultObject(isValidPassword,'Password must be between 6 to 20 and contain at least one numeric digit, one uppercase and one lowercase letter')
        return validationResult;
    },

    userNameValidation: function(userName){
        this.plainTextValidation('Username',3,10, userName);
    },

    descriptionValidation: function(descriptionText){
        this.plainTextValidation('Description',0,100, descriptionText);
    },


    // Length check is separated from symbol check for more user friendly check
    plainTextValidation: function(type,min,max,text){

        var minLenght=min;
        var maxLength=max;
        var text=text;
        var textType=type;
        var validationResult;

        var isLenghtValid=this.stringLenghtValidation(text, minLenght, maxLength);
        if(!isLenghtValid){
            validationResult=this.createResultObject(false, textType+' must be between ' +minLenght+ ' and ' +maxLength+ 'symbols')
            return validationResult;
        }

        var alphaNumericPattern=/^[a-zA-Z0-9_]+([-.][a-zA-Z0-9_]+)*$/i;

        if(!alphaNumericPattern.test(userName)){
            validationResult=this.createResultObject(false,  textType+' can contain only alphanumerical symbols');
            return validationResult;
        }

        validationResult=this.createResultObject(true);
        return validationResult;
    },

    stringLenghtValidation: function(string, botRange,upRange){
        var text=string,
            up=upRange,
            bot=botRange;


        if(!bot){
            bot=3;
        }

        if(!up){
            up=10;
        }

        return text.length>=bot && text.length<=up;
    }

}