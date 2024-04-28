# ADF Kitchen
A web application allows developers to build ADF documents visually.

Hosted on GitHub Page: https://khwong-c.github.io/adf-kitchen/

This is a companion project for the [Atlassian Document Builder](https://github.com/khwong-c/atlassian-doc-builder)
![PyPI - Downloads](https://img.shields.io/pypi/dw/atlassian-doc-builder)
![PyPI - Downloads](https://img.shields.io/pypi/dm/atlassian-doc-builder)



## Introduction
The Atlassian Document Builder is a Python package that allows you to build and manipulate Atlassian Document Format (ADF) documents programmatically. 
It can be used to generate ADF documents for use in Atlassian products such as Confluence and Jira.

This application that allows developer to 
- Build ADF documents visually
- Export ADF Document snippets in JSON, which can be reused in own projects.

## Quick Start
1. Install the Atlassian Document Builder package in the Python project.
    ```bash
    pip install atlassian-doc-builder
    ```
2. Open the [ADF Kitchen App](https://khwong-c.github.io/adf-kitchen/), creating document snippets and export the JSON.

3. Apply the snippet with the Python package `atlassian-doc-builder` by:
   - `load_adf()`: loading the JSON code
   - `apply_variable()`: applying template variables to the loaded object
   - `extend_content()`: extending the content of the loaded object and dynamic content.


