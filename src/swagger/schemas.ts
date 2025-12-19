/**
 * @swagger
 * components:
 *   schemas:
 *     CreateFreelanceDto:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - skills
 *         - dailyRate
 *       properties:
 *         name:
 *           type: string
 *           description: Freelance name
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Freelance email address
 *           example: john.doe@example.com
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           description: List of freelance skills
 *           example: ["JavaScript", "React", "Node.js"]
 *         dailyRate:
 *           type: number
 *           description: Daily rate in euros
 *           example: 500
 *
 *     Freelance:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Freelance unique identifier
 *           example: 1
 *         name:
 *           type: string
 *           description: Freelance name
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Freelance email address
 *           example: john.doe@example.com
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           description: List of freelance skills
 *           example: ["JavaScript", "React", "Node.js"]
 *         dailyRate:
 *           type: number
 *           description: Daily rate in euros
 *           example: 500
 *
 *     CreateCompanyDto:
 *       type: object
 *       required:
 *         - name
 *         - industry
 *       properties:
 *         name:
 *           type: string
 *           description: Company name
 *           example: Tech Corp
 *         industry:
 *           type: string
 *           description: Company industry
 *           example: Technology
 *
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Company unique identifier
 *           example: 1
 *         name:
 *           type: string
 *           description: Company name
 *           example: Tech Corp
 *         industry:
 *           type: string
 *           description: Company industry
 *           example: Technology
 *
 *     CreateProjectDto:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - requestedSkills
 *         - maxDailyRate
 *       properties:
 *         title:
 *           type: string
 *           description: Project title
 *           example: E-commerce website
 *         description:
 *           type: string
 *           description: Project description
 *           example: Build a modern e-commerce platform
 *         requestedSkills:
 *           type: array
 *           items:
 *             type: string
 *           description: List of required skills
 *           example: ["React", "Node.js", "MongoDB"]
 *         maxDailyRate:
 *           type: number
 *           description: Maximum daily rate in euros
 *           example: 600
 *
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Project unique identifier
 *           example: 1
 *         title:
 *           type: string
 *           description: Project title
 *           example: E-commerce website
 *         description:
 *           type: string
 *           description: Project description
 *           example: Build a modern e-commerce platform
 *         requestedSkills:
 *           type: array
 *           items:
 *             type: string
 *           description: List of required skills
 *           example: ["React", "Node.js", "MongoDB"]
 *         maxDailyRate:
 *           type: number
 *           description: Maximum daily rate in euros
 *           example: 600
 *         companyId:
 *           type: integer
 *           description: Company ID that owns the project
 *           example: 1
 *         freelanceId:
 *           type: integer
 *           nullable: true
 *           description: Freelance ID assigned to the project
 *           example: 1
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *           example: true
 *         data:
 *           description: Response data
 *
 *     ApiError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *           example: false
 *         error:
 *           type: string
 *           description: Error message
 *           example: Resource not found
 */
