var path  = require('path')
var fse   = require('fs-extra')

module.exports = function(projectPath, patterns, callback){
  
  var walk = function(dir, done) {
    
    fse.readdir(dir, function(err, list) {
      if (err) return done(err)
    
      var pending = list.length

      if (!pending) return done(null)
      list.forEach(function(file) {
      
        file = path.resolve(dir, file)
        fse.stat(file, function(err, stat) {          
          var cb = function(err, res) {
            if (!--pending) done(null)
          }
      
          if(patterns.indexOf(path.basename(file)) !== -1){
            fse.remove(file, cb)
          }else{
            if(stat.isDirectory()){
              walk(file, cb)
            }else{
              cb()
            }
          }
          
        })
      
      })
    })
    
  }
  
  walk(path.resolve(projectPath), callback)
  
}