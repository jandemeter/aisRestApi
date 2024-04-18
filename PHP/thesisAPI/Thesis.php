<?php
class Thesis
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    private function fetchData($pracoviste)
    {
        $url = "https://is.stuba.sk/pracoviste/prehled_temat.pl?lang=sk;pracoviste=$pracoviste";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);

        return $output;
    }

    public function getFreeTopics($pracoviste, $type = null, $supervisor = null, $program = null)
    {
        $html = $this->fetchData($pracoviste);

        $doc = new DOMDocument();
        @$doc->loadHTML($html);

        $xpath = new DOMXpath($doc);
        $rows = $xpath->query("//tr[contains(@class, 'uis-hl-table')]");

        $freeTopics = array();

        foreach ($rows as $row) {
            $cells = $row->getElementsByTagName('td');
            $topicName = trim($cells[2]->nodeValue);
            $topicType = trim($cells[1]->nodeValue);
            $topicStatusIndex = ($pracoviste == 549 || $pracoviste == 550 || $pracoviste == 818 || $pracoviste == 356) ? 8 : 9;
            $detailsIndex = ($pracoviste == 549 || $pracoviste == 550 || $pracoviste == 818 || $pracoviste == 356) ? 7 : 8;

            if ($type !== null && $type !== $topicType) {
                continue;
            }

            if ($supervisor !== null && $supervisor !== trim($cells[3]->nodeValue)) {
                continue;
            }

            if ($program !== null && $program !== trim($cells[5]->nodeValue)) {
                continue;
            }

            $topicStatus = trim($cells[$topicStatusIndex]->nodeValue);

            $statusParts = explode("/", $topicStatus);
            if (
                (count($statusParts) == 2) && // Kontrola, či sú k dispozícii dve časti
                (($statusParts[1] == " --") || (intval($statusParts[0]) == 0) || (intval($statusParts[0]) < intval($statusParts[1])))
            ) {
                $detailsLink = $cells[$detailsIndex]->getElementsByTagName('a')[0]->getAttribute('href');
                $abstract = $this->getAbstract($detailsLink);

                $freeTopics[] = array(
                    'topicName' => $topicName,
                    'supervisor' => trim($cells[3]->nodeValue),
                    'institute' => trim($cells[4]->nodeValue),
                    'program' => trim($cells[5]->nodeValue),
                    'focus' => (($pracoviste != 549 && $pracoviste != 550 && $pracoviste != 818 && $pracoviste != 356) ? trim($cells[6]->nodeValue) : null),
                    'abstract' => $abstract
                );
            }
        }

        return $freeTopics;
    }



    private function getAbstract($detailsLink)
    {
        $url = "https://is.stuba.sk" . $detailsLink;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);

        $doc = new DOMDocument();
        @$doc->loadHTML($output);

        $abstract = "";
        $abstractNode = $doc->getElementsByTagName('td');
        foreach ($abstractNode as $node) {
            if ($node->getAttribute('align') == "justify") {
                $abstract = trim($node->nodeValue);
                break;
            }
        }

        return $abstract;
    }
}
?>
