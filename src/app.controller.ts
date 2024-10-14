import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { BookingDto } from './booking.dto';
import { response, Response } from 'express';

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
    
}
}