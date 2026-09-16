import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import Hero from './Hero';
import Projects from './Projects';
import { CustomThemeProvider } from '../contexts/ThemeContext';
import { portfolioData, mapData } from '../data/portfolio';

// Hero and Projects are rendered directly rather than through App, which pulls
// in the map (and so mapbox-gl and turf) for a route these tests never visit.
const renderWithTheme = (ui: ReactElement) =>
  render(<CustomThemeProvider>{ui}</CustomThemeProvider>);

test('hero renders the name, headline and every contact link', () => {
  renderWithTheme(<Hero />);

  expect(screen.getByText(portfolioData.name)).toBeInTheDocument();
  expect(screen.getByText(portfolioData.title)).toBeInTheDocument();

  expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
    'href',
    `mailto:${portfolioData.contact.email}`
  );
  expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
    'href',
    portfolioData.contact.linkedin
  );
  expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
    'href',
    portfolioData.contact.github
  );
});

test('projects renders a card for every project', () => {
  renderWithTheme(<Projects />);

  portfolioData.projects.forEach(project => {
    expect(screen.getByText(project.title)).toBeInTheDocument();
  });
});

test('every project link points somewhere and opens safely', () => {
  renderWithTheme(<Projects />);

  const links = portfolioData.projects.flatMap(p => p.links ?? []);
  expect(links.length).toBeGreaterThan(0);

  links.forEach(({ url, label }) => {
    const anchor = screen.getAllByRole('link', { name: label }).find(
      el => el.getAttribute('href') === url
    );
    expect(anchor).toBeDefined();
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});

// data/portfolio.ts applies the types with a cast, so a typo in the JSON gets
// past the compiler. These assertions are what actually enforce the contract.
test('portfolio JSON matches the contract the components assume', () => {
  const ids = portfolioData.projects.map(p => p.id);
  expect(new Set(ids).size).toBe(ids.length);

  expect(Array.isArray(portfolioData.about)).toBe(true);
  expect(portfolioData.about.length).toBeGreaterThan(0);

  portfolioData.projects.forEach(p => {
    expect(['professional', 'earlier']).toContain(p.category);
    expect(p.tags.length).toBeGreaterThan(0);
    (p.links ?? []).forEach(l => {
      expect(['apple', 'android', 'web', 'github']).toContain(l.icon);
      expect(l.url).toMatch(/^https:\/\//);
    });
  });
});

test('map JSON has valid coordinates and point types', () => {
  expect(mapData.points.length).toBeGreaterThan(0);

  mapData.points.forEach(pt => {
    expect(['work', 'travel']).toContain(pt.type);
    expect(pt.coordinates).toHaveLength(2);
    const [lng, lat] = pt.coordinates;
    expect(Math.abs(lng)).toBeLessThanOrEqual(180);
    expect(Math.abs(lat)).toBeLessThanOrEqual(90);
  });
});
