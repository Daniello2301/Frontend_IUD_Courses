import { createRouter, createWebHashHistory } from 'vue-router';

import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import Programs from './components/program/ListProgram.vue'
import CreateProgram from './components/program/CreateProgram.vue'
import EditProgram from './components/program/EditProgram.vue'
import Program from './components/program/Program.vue'
import Semesters from './components/semester/AllSemesters.vue'
import Semester from './components/semester/Semester.vue'
import AddSemester from './components/semester/CreateSemester.vue'
import Courses from './components/course/AllCourse.vue'
import Course from './components/course/EditCourse.vue'
import AddCourse from './components/course/CreateCourse.vue'
import CourseDetail from './components/course/Course.vue'

export default new createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name:"Login",
            component: Login
        },
        {
            path: "/home",
            alias: "/home",
            name: "home",
            component: Home
        },
        {
            path: "/register",
            alias: "/register",
            name: "register",
            component: Register
        },
        {
            path: "/programs",
            alias: "/programs",
            name: "programs",
            component: Programs
        },
        {
            path: "/crete-pro",
            alias: "/crete-pro",
            name: "create-program",
            component: CreateProgram
        },
        {
            path: "/update-pro/:id",
            alias: "/update-pro/:id",
            name: "update-program",
            component: EditProgram
        },
        {
            path: "/program/:id",
            alias: "/program/:id",
            name: "program-details",
            component: Program
        },
        {
            path: "/semesters",
            alias: "/semesters",
            name: "semesters",
            component: Semesters,
        },
        {
            path: "/semester/:id",
            alias: "/semester/:id",
            name: "semester-details",
            component: Semester
        },
        {
            path: "/create-semester",
            alias: "/create-semester",
            name: "create-semester",
            component: AddSemester
        },
        {
            path: "/courses",
            alias: "/courses",
            name: "courses",
            component: Courses,
        },
        {
            path: "/course/:id",
            alias: "/course/:id",
            name: "course-edit",
            component: Course
        },
        {
            path: "/create-course",
            alias: "/create-course",
            name: "create-course",
            component: AddCourse
        },
        {
            path: "/courses/:id/semester",
            alias: "/courses/:id/semester",
            name: "courses-Semester",
            component: CourseDetail
        }
    ]
});