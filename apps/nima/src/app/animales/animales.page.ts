import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit {

  animales: any[] = [
    {
      name: "Lion.name",
      species: "Lion.species",
      image: "assets/images/animals/lion.svg",
      sound: "Lion.sound"
    }, 
    {
      name: "Butterfly.name",
      species: "Butterfly.species",
      image: "assets/images/animals/butterfly.svg",
      sound: "Butterfly.sound"
    },
    {
      name: "Flamingo.name",
      species: "Flamingo.species",
      image: "assets/images/animals/flamingo.svg",
      sound: "Flamingo.sound"
    },
    {
      name: "Toucan.name",
      species: "Toucan.species",
      image: "assets/images/animals/toucan.svg",
      sound: "Toucan.sound"
    },
    {
      name: "Dog.name",
      species: "Dog.species",
      image: "assets/images/animals/dog.svg",
      sound: "Dog.sound"
    }
  ];  

  activeAnimal = null;
  player : Howl = null;
  isPlaying = false;
  
  constructor(
    private translateService: TranslateService,
    ) {}
  
    ngOnInit() {
    }
    
    playSound(animal){
      if(this.player){
        this.player.stop();
      }
      let soundPath;
      this.translateService.get(animal.sound).subscribe(
        value => {
          soundPath = value;
        }
      );
      this.player = new Howl({
        src: [soundPath],
        onplay:() =>  {
          console.log('onplay');
          this.isPlaying = true;
          this.activeAnimal = animal;
        },
        onend:() => {
          this.activeAnimal = null;
          console.log('onend');
        }
      });
      this.player.play();
    }

    togglePlayer(pause){
      this.isPlaying = !pause;
      if(pause){
        this.player.pause();
        this.activeAnimal = null;
      } else{
        this.player.play();
      }
    }

    start(animal, pause){
      this.playSound(animal);
      this.togglePlayer(pause);
    }
  }
  