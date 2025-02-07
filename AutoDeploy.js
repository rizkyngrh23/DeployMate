#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

class AutoDeploy {
    constructor() {
        console.time('Total Deployment Time');
        this.config = this.loadConfig();
        console.log('Loaded config:', this.config);
    }

    loadConfig() {
        console.time('Load Config');
        const configPath = resolve(process.cwd(), 'deploy.config.json');
        if (!existsSync(configPath)) {
            throw new Error('Configuration file not found: deploy.config.json');
        }
        const config = JSON.parse(readFileSync(configPath, 'utf-8'));
        console.timeEnd('Load Config');
        return config;
    }

    detectProjectType() {
        console.time('Detect Project Type');
        if (existsSync('package.json')) {
            const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
            if (packageJson.dependencies['next']) {
                console.timeEnd('Detect Project Type');
                return 'Next.js';
            }
            if (packageJson.dependencies['react']) {
                console.timeEnd('Detect Project Type');
                return 'React';
            }
            if (packageJson.dependencies['express']) {
                console.timeEnd('Detect Project Type');
                return 'Express';
            }
        }
        if (existsSync('index.html')) {
            console.timeEnd('Detect Project Type');
            return 'Static';
        }
        console.timeEnd('Detect Project Type');
        throw new Error('Unsupported project type');
    }

    checkLogin(provider) {
        try {
            switch (provider) {
                case 'vercel':
                    execSync('npx vercel whoami', { stdio: 'inherit' });
                    break;
                case 'netlify':
                    execSync('npx netlify status', { stdio: 'inherit' });
                    break;
                case 'digitalocean':
                    execSync('doctl auth init', { stdio: 'inherit' });
                    break;
                default:
                    throw new Error('Unsupported provider');
            }
        } catch (error) {
            console.log(`Not logged in to ${provider}. Please log in.`);
            switch (provider) {
                case 'vercel':
                    execSync('npx vercel login', { stdio: 'inherit' });
                    break;
                case 'netlify':
                    execSync('npx netlify login', { stdio: 'inherit' });
                    break;
                case 'digitalocean':
                    execSync('doctl auth init', { stdio: 'inherit' });
                    break;
                default:
                    throw new Error('Unsupported provider');
            }
        }
    }

    deploy() {
        try {
            const projectType = this.detectProjectType();
            console.log(`Detected project type: ${projectType}`);

            this.checkLogin(this.config.provider);

            switch (this.config.provider) {
                case 'vercel':
                    this.deployToVercel();
                    break;
                case 'netlify':
                    this.deployToNetlify();
                    break;
                case 'digitalocean':
                    this.deployToDigitalOcean();
                    break;
                default:
                    throw new Error('Unsupported provider');
            }
        } catch (error) {
            console.error('Deployment failed:', error.message);
        } finally {
            console.timeEnd('Total Deployment Time');
        }
    }

    deployToVercel() {
        try {
            console.time('Deploy to Vercel');
            console.log('Deploying to Vercel...');
            execSync('npx vercel --prod', { stdio: 'inherit' });
        } catch (error) {
            console.error('Failed to deploy to Vercel:', error.message);
        } finally {
            console.timeEnd('Deploy to Vercel');
        }
    }

    deployToNetlify() {
        try {
            console.time('Deploy to Netlify');
            console.log('Deploying to Netlify...');
            execSync('npx netlify deploy --prod', { stdio: 'inherit' });
        } catch (error) {
            console.error('Failed to deploy to Netlify:', error.message);
        } finally {
            console.timeEnd('Deploy to Netlify');
        }
    }

    deployToDigitalOcean() {
        try {
            console.time('Deploy to DigitalOcean');
            console.log('Deploying to DigitalOcean...');
            execSync('doctl apps create --spec .do/app.yaml', { stdio: 'inherit' });
        } catch (error) {
            console.error('Failed to deploy to DigitalOcean:', error.message);
        } finally {
            console.timeEnd('Deploy to DigitalOcean');
        }
    }
}

const autoDeploy = new AutoDeploy();
autoDeploy.deploy();
