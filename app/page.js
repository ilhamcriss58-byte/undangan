<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Undangan Pernikahan Anggun & Ilham</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <style>
        :root {
            --gold: #d4af37;
            --dark-blue: #0a192f;
            --soft-white: #f8f9fa;
            --glass: rgba(255, 255, 255, 0.2);
        }

        body, html {
            margin: 0;
            padding: 0;
            font-family: 'Montserrat', sans-serif;
            scroll-behavior: smooth;
            overflow-x: hidden;
            background-color: var(--soft-white);
        }

        /* Background Logic */
        .page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 60px 20px;
            position: relative;
            box-sizing: border-box;
        }

        .bg-wedding {
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
                        url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop'); /* Placeholder Luxury Wedding */
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
        }

        .bg-clouds {
            background: linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), 
                        url('https://www.transparenttextures.com/patterns/clouds.png');
            background-color: #f0f7ff;
            color: var(--dark-blue);
        }

        /* Overlay Cover */
        #cover {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1);
        }

        /* Typography */
        h1 { font-family: 'Great Vibes', cursive; font-size: 4.5rem; margin: 15px 0; color: var(--gold); text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        h2 { font-family: 'Playfair Display', serif; font-size: 2.8rem; margin-bottom: 10px; }
        .quote { font-style: italic; max-width: 700px; line-height: 1.8; margin: 20px auto; font-size: 1.1rem; }
        .sub-text { font-weight: 300; letter-spacing: 5px; text-transform: uppercase; font-size: 0.9rem; }

        /* Music Control (Elegant Icon) */
        #music-control {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
            background: rgba(212, 175, 55, 0.9);
            width: 55px; height: 55px;
            border-radius: 50%;
            display: none;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            border: 2px solid white;
            transition: all 0.3s ease;
        }

        .music-spin { animation: spin 4s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* Buttons */
        .btn-luxury {
            padding: 15px 40px;
            border: 2px solid var(--gold);
            background: rgba(212, 175, 55, 0.1);
            color: var(--gold);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2
