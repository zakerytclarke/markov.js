function markov(){
  this.state="sunshine";
  this.weights=[];
  this.states=[];
  this.next=function(){
    var index=this.states.indexOf(this.state);
    if(index>=0){
      var temp=this.weights[index];
      var len=temp.length;
      var total=0;
      for(var i=0;i<len;i++){
        total+=temp[i];
      }
      i=0;
      var c=Math.random()*total;
      var rt=0;
      while(rt<c){
        rt+=temp[i];
        i++;
      }
    i--;
    this.state=this.states[i];
  }else{
    this.state="Invalid State";
  }
  return this.state;
  };
  this.train=function(pstate,nstate){
    var pindex=this.states.indexOf(pstate);
    var nindex=this.states.indexOf(nstate);
    if(nindex==-1||pindex==-1){
      console.log("Invalid State");
    }else{
      this.weights[pindex][nindex]++;
    }
  }
  this.clear=function(){
    this.state="";
    this.states=[];
    this.weights=[];
  }
  this.addstate=function(state){
    if(this.states.indexOf(state)==-1){
      this.states.push(state);
      var temp=[];
      for(var i=0;i<this.states.length;i++){
        temp.push(0);
      }
      this.weights.push(temp);
      for(var i=0;i<this.states.length-1;i++){
        this.weights[i].push(0);
      }
    }
  }
  this.load=function(states,weights){
    var test=0;
    for(var i=0;i<weights.length;i++){
      if(weights[i].length!=states.length){
        test=1;
      }
    }
    if(weights.length==states.length&&test==0){
      this.states=states;
      this.weights=weights;
      this.state=this.states[0];
    }else{
        console.log("Invalid Markov Chain.")
    }
  }
  this.analyze=function(){
    var str="";
    for(var i=0;i<this.states.length;i++){
        str+=this.states[i]+":{";
        var total=0;
        for(var j=0;j<this.weights[i].length;j++){
          total+=this.weights[i][j];
        }
        for(var k=0;k<this.weights[i].length;k++){
          str+=this.states[k]+":"+(this.weights[i][k]/total*100).toFixed(2)+"%,";
        }
        str=str.substring(0,str.length-1);
        str+="}\n";
    }
    console.log(str);
    return str;
  }
}
