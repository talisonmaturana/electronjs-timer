const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    saveDatas(course, studiedTime){
        let courseFile = __dirname + '/data/' + course + '.json';
        if(fs.existsSync(courseFile)){
            this.addTimeToCouse(courseFile, studiedTime);
        } else {
            this.createCourseFile(courseFile, {})
                    .then(() => {
                        this.addTimeToCouse(courseFile, studiedTime);
                    });
        }
    },
    addTimeToCouse(courseFile, studiedTime){
        let datas = {
            lastStudy: new Date().toString(),
            time: studiedTime
        }
        jsonfile.writeFile(courseFile, datas, { spaces: 2 })
            .then(() => {
                console.log('Time saved successfully');
            })
            .catch(error => {
                console.log(error);
            })
    },
    createCourseFile(fileName, fileContent){
        return jsonfile.writeFile(fileName, fileContent)
                .then(() => {
                    console.log('File created');
                })
                .catch(error => {
                    console.log(error);
                });
    },
    getDatas(course){
        let courseFile = __dirname + '/data/' + course + '.json';
        return jsonfile.readFile(courseFile);
    },
    getCoursesName(){
        let files = fs.readdirSync(__dirname + '/data/');
        let courses = files.map(file => {
            return file.substr(0, file.lastIndexOf('.'));
        });
        return courses; 
    }
}