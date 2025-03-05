﻿export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		component: './TodoList',
		icon: 'UnorderedListOutlined',hideInMenu: true,
	},{
		path: '/random',
		name: 'Random',
		component: './Random',	
		icon: 'WifiOutlined',hideInMenu: true,
	},
	{
		path: '/keo-bua-bao',
		name: 'Trò chơi',
		component: './KeoBuaBao',	
		icon: 'WifiOutlined',
	},
	// {
	// 	// path: '/study-tracker',
	// 	name: 'Theo dõi môn học',hideInMenu: true,
	// 	routes: [
	// 				{
	// 					name: 'Quản lý môn học',
	// 					path: 'quan-ly-mon-hoc',
	// 					component: './StudyTracker/SubjectManager',
	// 				},
	// 				{
	// 					name: 'Tiến trình',
	// 					path: 'quan-ly-mon-hoc/:id',
	// 					component: './StudyTracker/StudyProgress',
	// 					hideInMenu: true,
	// 				},{
	// 					name: 'Mục tiêu',
	// 					path: 'muc-tieu-mon-hoc',
	// 					component: './StudyTracker/StudyGoals',
	// 				},
	// 			],
	// 	icon: 'MenuUnfoldOutlined',
	// },
	{
		
		name: 'Quản lý đề thi',
		routes: [
					{
						name: 'Quản lý môn học',
						path: 'mon-hoc',
						component: './Exam/Subjects',
					},
					{
						name: 'Quản lý câu hỏi',
						path: 'quan-ly-cau-hoi',
						component: './Exam/Questions',
					},{
						name: 'Quản lý đề thi',
						path: 'muc-tieu-mon-hoc',
						component: './Exam/Exam',
					},
				],
		icon: 'MenuUnfoldOutlined',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
