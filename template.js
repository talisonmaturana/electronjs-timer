const data = require('./data');

module.exports = {
    generateTrayTemplate(window){
        let template = [
            {
                'label': 'Cursos'
            },
            {
                type: 'separator'
            }
        ];

        let courses = data.getCoursesName();
        courses.forEach(course => {
            let menuItem = {
                label: course,
                type: 'radio',
                click: () => {
                    window.send('changed-course', course);
                }
            }

            template.push(menuItem);
        });

        return template;
    }
}