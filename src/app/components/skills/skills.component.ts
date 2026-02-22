import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Skill {
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-skills',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

  coreSkills: Skill[] = [
    { name: 'Angular', icon: 'fab fa-angular', color: 'text-red-500' },
    { name: 'TypeScript', icon: 'fab fa-js', color: 'text-blue-500' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: 'text-yellow-400' },
    { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
    { name: 'CSS3/Sass', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: 'text-green-500' },
    { name: 'Python', icon: 'fab fa-python', color: 'text-sky-500' },
    { name: 'SQL', icon: 'fas fa-database', color: 'text-gray-400' },
    { name: 'RxJS', icon: 'fas fa-sync', color: 'text-pink-500' },
    { name: 'NgRx', icon: 'fas fa-project-diagram', color: 'text-purple-600' },
    { name: 'Material', icon: 'fas fa-layer-group', color: 'text-cyan-400' },
    { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: 'text-purple-500' },
  ];

  tools = [
    'Git/GitHub', 'VS Code', 'Postman', 'Swagger', 'Webpack',
    'Responsive Design', 'Unit Testing', 'SOLID Principles',
    'Design Patterns', 'Data Structures'
  ];
}