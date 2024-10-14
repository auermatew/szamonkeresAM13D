import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { BookingDto } from './booking.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  @Get()
  @Render('booking_form')
  showBookingForm() {
    return { errors : []}; 
  }
  @Post('booking')
  handleBookingForm(
    @Body() bookingData: BookingDto,
    @Res() response: Response,
  ) {
    const errors = [];


    if (!bookingData.name || !bookingData.name.trim()) {
      errors.push({ message: 'A név megadása kötelező!' });
    }

    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(bookingData.email)) {
      errors.push({ message: 'Érvényes e-mail címet adjon meg!' });
    }

    const currentDate = new Date();
    if (!bookingData.date || new Date(bookingData.date) < currentDate) {
      errors.push({ message: 'A dátum nem lehet a mai napnál régebbi!' });
    }


    const guests = parseInt(bookingData.guests, 10);
    if (isNaN(guests) || guests < 1 || guests > 10) {
      errors.push({ message: 'A vendégek száma 1 és 10 között kell legyen!' });
    }

    if (errors.length > 0) {
      response.render('booking_form', { errors: errors });
    } else {
      response.redirect('/success');
    }
  }
}
