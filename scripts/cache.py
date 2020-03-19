"""
Very basic script to clear HTML files from the cache. On every push to master
this script will clear the most commonly used HTML pages.

If css or pdf's have changed we might need to Purge the cache. Needs to be
done in Cloudflare's dashboard: https://dash.cloudflare.com/

Get an overview of the available zones and their zone_id.

curl -X GET "https://api.cloudflare.com/client/v4/zones" \
     -H "X-Auth-Email: tech@coronadenktank.be" \
     -H "X-Auth-Key: 9c56047583875706a14ad38f3280bf381c452" \
     -H "Content-Type: application/json" | jq .
"""
import json
import os

# Key value mapping of urls that needs to be cleard
# - Key format: <naked domain>_ <cloudflare_zone_id>
MAPPING = {
    'maakjemondmasker.be_797f4fdc62bcccad8192c6a085d55021': [
        'https://maakjemondmasker.be',
        'https://www.maakjemondmasker.be',
        'https://maakjemondmasker.be/',
        'https://www.maakjemondmasker.be/',
        'https://maakjemondmasker.be/index.html',
        'https://www.maakjemondmasker.be/index.html',
        'https://maakjemondmasker.be/disclaimer_nl.html',
        'https://www.maakjemondmasker.be/disclaimer_nl.html',
    ],

    'faitesvotremasquebuccal.be_1396e8353ba83f820cec2d6df7e02869': [
        'https://faitesvotremasquebuccal.be',
        'https://faitesvotremasquebuccal.be/',
        'https://faitesvotremasquebuccal.be/index.html',
        'https://faitesvotremasquebuccal.be/disclaimer_fr.html',
    ],

    'makefacemasks.com_d2397b2fdf55f83933c9a227e6b7256b': [
        'https://makefacemasks.com',
        'https://makefacemasks.com/',
        'https://makefacemasks.com/index.html',
        'https://makefacemasks.com/disclaimer_en.html',
    ]
}

CACHE_URL = 'https://api.cloudflare.com/client/v4/zones/{}/purge_cache'
CONFIG_API_EMAIL = 'tech@coronadenktank.be'
CONFIG_API_KEY = '9c56047583875706a14ad38f3280bf381c452'


def clear(mapping):
    """
    Examples
    --------

    curl -X POST "https://api.cloudflare.com/client/v4/zones/797f4fdc62bcccad8192c6a085d55021/purge_cache" \
         -H "X-Auth-Email: tech@coronadenktank.be" \
         -H "X-Auth-Key: 9c56047583875706a14ad38f3280bf381c452" \
         -H "Content-Type: application/json" \
         --data '{"files":["https://maakjemondmasker.be/css/test.css"]}'
    """
    for key, value in mapping.items():
        domain, zone_id = key.split('_')
        print(f'Clearing: {domain}')
        zone_url = CACHE_URL.format(zone_id)
        json_str = json.dumps({'files': value})
        cmd = f"curl -X POST '{zone_url}' " \
              f" -H 'X-Auth-Email: {CONFIG_API_EMAIL}' " \
              f" -H 'X-Auth-Key: {CONFIG_API_KEY}' " \
              f" -H 'Content-Type: application/json' " \
              f" --data '{json_str}'"
        os.system(cmd)
        print('\n')


if __name__ == "__main__":
    clear(MAPPING)
