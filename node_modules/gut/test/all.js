var path    = require('path')
var should  = require('should')
var fse     = require('fs-extra')
var gut     = require('../')


describe("all", function(){
  
  var sourcePath = path.join(__dirname, "fixtures", "project")
  var outputPath = path.join(__dirname, "fixtures", "output")
    
  before(function(done){
    fse.copy(sourcePath, outputPath, done)
  })
  
  it("should exist", function(done){
    should.exist(gut)
    done()
  })
  
  it("should remove files", function(done){
    gut(outputPath, ["goodbye.txt", "removeme", "ditch"], function(err){
      //console.log(fse.readFileSync(path.join(outputPath, "goodbye.txt")).toString())
      fse.existsSync(path.join(outputPath, "goodbye.txt")).should.not.be.true
      fse.existsSync(path.join(outputPath, "foo", "bar", "goodbye.txt")).should.not.be.true
      fse.existsSync(path.join(outputPath, "foo", "removeme")).should.not.be.true
      fse.existsSync(path.join(outputPath, "foo", "removeme", "done.txt")).should.not.be.true
      fse.existsSync(path.join(outputPath, "foo", "bar", "baz.txt")).should.be.true
      done()
    })
  })
  
  after(function(done){
    fse.remove(outputPath, done)
  })
  
})