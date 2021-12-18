import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const createdAt = +(params.get('createdAt') ?? '0');
      const slug = params.get('slug') ?? '';

      if (isNaN(createdAt)) {
        this.router.navigate(['404']);
        return;
      }
    });
  }
}
