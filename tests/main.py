import unittest
from pathlib import Path

from selenium import webdriver


PORT = 5500
PATH = 'drivers/chromedriver.exe'

try:
    DRIVER = Path(__file__).parents[1].joinpath(PATH).resolve()
except NameError:
    # Allow to copy and paste to the terminal.
    DRIVER = PATH

'''
browser = webdriver.Chrome(str(DRIVER))
browser.get(f'http://localhost:{PORT}')

keymap = browser.find_element_by_name()
keymap.click()
'''


class PageTestCase(unittest.TestCase):
    """Make sure required HTML attributes are not missing."""
    def setUp(self):
        self.browser = webdriver.Chrome(str(DRIVER))
        self.addCleanup(self.browser.quit)

    def testTitle(self):
        self.browser.get(f'http://localhost:{PORT}')
        self.assertIn('Configurator', self.browser.title)

    # TODO: Keymap form.
    def testForm(self):
        self.browser.get(f'http://localhost:{PORT}')


if __name__ == '__main__':
    unittest.main(verbosity=2)
