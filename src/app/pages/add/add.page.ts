import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {LocationModel} from 'src/app/models/location.model';
import {OeuvreModel} from 'src/app/models/oeuvre.model';
import {OeuvreService} from 'src/app/services/oeuvre.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  private placeForm: FormGroup;
  private categories: Array<string>;
  private submited: boolean = false;
  private loader: boolean = false;
  private nativePicture: string;
  private latitude: number;
  private longitude: number;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public camera: Camera,
    public oeuvreService: OeuvreService,
    private storage: Storage
  ) {
  }

  async ngOnInit() {
    this.buildForm();
    this.latitude = await this.storage.get('latitude');
    this.longitude = await this.storage.get('longitude');

  }

  buildForm() {
    this.placeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: [''],
      nativeImage: [''],
      note: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    }, {
      validator: this.validateImage('image', 'nativeImage'),
    });
  }

  save() {
    this.submited = true;
    if (!this.placeForm.valid) {
      return;
    }
    this.loader = true;

    let values = this.placeForm.value;
    let image = this.nativePicture ? this.nativePicture : values['image'];

    let lat = this.latitude;
    let long = this.longitude;
    let location = new LocationModel(
      lat,
      long
    );
    let oeuvre = new OeuvreModel(
      values['name'],
      image,
      location,
      values['note'],
      new Date()
    );

    this.oeuvreService.add(oeuvre).subscribe(place => {
      this.router.navigate(['/tabs/listing']);
    });
  }

  getForm() {
    return this.placeForm.controls;
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(data => {
      this.nativePicture = 'data:image/jpeg;base64,' + data;
      this.getForm().nativeImage.setValue(this.nativePicture);
    });
  }

  validateImage(form: string, native: string) {
    return (formGroup: FormGroup) => {
      let image = formGroup.controls[form];
      let nativeImage = formGroup.controls[native];

      if (nativeImage.value) {
        return image.setErrors(null);
      }

      let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
      if (image.value && regex.test(image.value)) {
        return image.setErrors(null);
      }

      return image.setErrors({noImage: true});
    };
  }
}
