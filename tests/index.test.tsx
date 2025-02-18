import { h } from 'preact';
import { render, fireEvent, screen, waitFor } from '@testing-library/preact';
import { App } from '../src/index';

describe('Header', async () => {
    test('should display title', () => {
        const {container} = render(<App />);

        expect(screen.findByRole('heading', {level: 1, description: 'Fixly: Hardware & Software Repair'})).toBeDefined()
        
    })
})